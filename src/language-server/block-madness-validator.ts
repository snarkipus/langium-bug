import { ValidationAcceptor, ValidationChecks } from 'langium';
import { BlockMadnessAstType, Person } from './generated/ast';
import type { BlockMadnessServices } from './block-madness-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: BlockMadnessServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.BlockMadnessValidator;
    const checks: ValidationChecks<BlockMadnessAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class BlockMadnessValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
