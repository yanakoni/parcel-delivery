import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Address, Dimension } from '../repository';
import { PriceEstimationServiceInterface } from './price-estimation.service.interface';

@Injectable()
export class PriceEstimationService implements PriceEstimationServiceInterface {
    private readonly GOOGLE_API_KEY: string;
    private readonly BASE_PRICE: number;
    private readonly DIMENSIONS_FACTOR: number;
    private readonly WEIGHT_FACTOR: number;
    private readonly KM_FACTOR: number;

    constructor(
        @Inject(ConfigService)
        private readonly config: ConfigService,
    ) {
        this.GOOGLE_API_KEY = this.config.get('googleApiKey');
        this.BASE_PRICE = this.config.get('package.basePrice');
        this.DIMENSIONS_FACTOR = this.config.get('package.dimensionsFactor');
        this.WEIGHT_FACTOR = this.config.get('package.weightFactor');
        this.KM_FACTOR = this.config.get('package.kmFactor');
    }

    async estimatePrice(
        parcelDimensions: Dimension,
        parcelWeight: number,
        departureLocation: Address,
        destinationLocation: Address,
    ) {
        // Base price for delivery services
        // const basePrice = 10.0;

        // Price calculation based on dimensions and weight
        // const dimensionFactor = 0.05; // price increase per cubic cm
        // const weightFactor = 0.2; // price increase per kg
        // const kmFactor = 0.1; // price increase per km

        // Calculate parcel volume
        const { length, width, height } = parcelDimensions;
        const volume = length * width * height;

        // Calculate price based on dimensions, weight and distance
        const priceFromDimensions = volume * this.DIMENSIONS_FACTOR;
        const priceFromWeight = parcelWeight * this.WEIGHT_FACTOR;

        const distance = await this.getDistanceBetweenAddresses(
            this.addressToString(departureLocation),
            this.addressToString(destinationLocation),
        );
        const priceFromDistance = distance * this.KM_FACTOR;

        // Calculate total price
        return (
            this.BASE_PRICE +
            priceFromDimensions +
            priceFromWeight +
            priceFromDistance
        );
    }

    private async getDistanceBetweenAddresses(
        origin: string,
        destination: string,
    ): Promise<number> {
        try {
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
                origin,
            )}&destinations=${encodeURIComponent(destination)}&key=${
                this.GOOGLE_API_KEY
            }`;

            const { data, status } = await axios.get(url);

            if (status === 200 && data.rows[0].elements[0].status === 'OK') {
                // Convert from meters to kilometers
                return data.rows[0].elements[0].distance.value / 1000;
            } else {
                return 0;
            }
        } catch (error) {
            console.error('Error: ', error);
            return 0;
        }
    }

    private addressToString({ country, state, city, street }: Address) {
        return `${country} ${state} ${city} ${street}`;
    }
}
