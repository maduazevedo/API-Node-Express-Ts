import { ServerError } from '../exceptions/server-error'; 

export async function verifyAddress(address: string) {
    try {
        const [latitude, longitude] = address.split(',').map(coord => parseFloat(coord.trim()));

        if (isNaN(latitude) || isNaN(longitude)) {
            throw new ServerError(" Endereço inválido. Latitude e longitude devem ser números válidos.", 400);
        }

            return { latitude, longitude }; 

    } catch (error) {
        throw new ServerError("Erro interno ao verificar o endereço.", 500);
    }
}