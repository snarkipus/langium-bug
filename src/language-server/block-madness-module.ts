import {
    createDefaultModule, createDefaultSharedModule, DefaultSharedModuleContext, inject,
    LangiumServices, LangiumSharedServices, Module, PartialLangiumServices
} from 'langium';
import { BlockMadnessGeneratedModule, BlockMadnessGeneratedSharedModule } from './generated/module';
import { BlockMadnessValidator, registerValidationChecks } from './block-madness-validator';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type BlockMadnessAddedServices = {
    validation: {
        BlockMadnessValidator: BlockMadnessValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type BlockMadnessServices = LangiumServices & BlockMadnessAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const BlockMadnessModule: Module<BlockMadnessServices, PartialLangiumServices & BlockMadnessAddedServices> = {
    validation: {
        BlockMadnessValidator: () => new BlockMadnessValidator()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createBlockMadnessServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    BlockMadness: BlockMadnessServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        BlockMadnessGeneratedSharedModule
    );
    const BlockMadness = inject(
        createDefaultModule({ shared }),
        BlockMadnessGeneratedModule,
        BlockMadnessModule
    );
    shared.ServiceRegistry.register(BlockMadness);
    registerValidationChecks(BlockMadness);
    return { shared, BlockMadness };
}
