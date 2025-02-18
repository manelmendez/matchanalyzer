import bcrypt from 'bcrypt';

// Hashear la contraseña
export const hashPassword = async(password: string) => {
    try {
        const salt = await bcrypt.genSalt(12); // El 12 es el "cost factor" (más alto = más seguro)
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
    }
}

// Comparar contraseñas
export const comparePassword = async(storedHash:string, inputPassword:string) => {
    try {
        const isMatch = await bcrypt.compare(inputPassword, storedHash);
        return isMatch; // true si coinciden, false si no
    } catch (error) {
        console.error('Error al comparar las contraseñas:', error);
    }
}