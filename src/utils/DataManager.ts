import { validate, ValidationOptions } from 'class-validator';

export class DataManager {
    /**
     * Permet de set les valeurs du DTO dans une entity
     *
     * @param  {{[key:string]:any}} dto
     * @param  {{[key:string]:any}} entity
     * @returns object
     */
    static async handleDto<T>(dto: { [key: string]: any }, entity: { [key: string]: any }): Promise<T> {
        const keys = Object.keys(dto);
        keys.forEach((key) => {
            entity[key] = dto[key];
        });
        return await DataManager.dataValidations(entity as T);
    }
    /**
     * Permet de valider les données d'une entité
     * Vadiation baser sur les décorateurs de l'entité
     *
     * @param  {T} entity
     * @param  {ValidationOptions={}} validationOptions
     * @returns Promise
     */
    static async dataValidations<T>(entity: T, validationOptions: ValidationOptions = {}): Promise<T> {
        const errros = await validate(entity, validationOptions);
        console.log(errros);
        if (errros.length > 0) {
            // creer une string, qui indique les divers erreurs
            let errorsString = '';
            errros.forEach((error) => {
                Object.keys(error.constraints).forEach((key) => {
                    errorsString += `${error.constraints[key]}, `;
                });
                errorsString += ' | ';
            });
            throw new Error(`Validations failed : ${errorsString}`);
        }

        return entity;
    }
}
