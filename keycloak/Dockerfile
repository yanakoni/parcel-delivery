FROM quay.io/keycloak/keycloak:22.0.5

USER root

COPY dev.json /tmp/dev.json

USER keycloak

CMD ["start-dev", "--import-realm"]
