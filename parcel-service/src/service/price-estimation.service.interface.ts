import { Address, Dimension } from '../repository';

export interface PriceEstimationServiceInterface {
    estimatePrice(
        parcelDimensions: Dimension,
        parcelWeight: number,
        departureLocation: Address,
        destinationLocation: Address,
    ): Promise<number>;
}
