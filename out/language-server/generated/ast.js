"use strict";
/******************************************************************************
 * This file was generated by langium-cli 1.0.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflection = exports.BlockMadnessAstReflection = exports.isPerson = exports.Person = exports.isModel = exports.Model = exports.isGreeting = exports.Greeting = exports.isGoodbye = exports.Goodbye = void 0;
/* eslint-disable */
const langium_1 = require("langium");
exports.Goodbye = 'Goodbye';
function isGoodbye(item) {
    return exports.reflection.isInstance(item, exports.Goodbye);
}
exports.isGoodbye = isGoodbye;
exports.Greeting = 'Greeting';
function isGreeting(item) {
    return exports.reflection.isInstance(item, exports.Greeting);
}
exports.isGreeting = isGreeting;
exports.Model = 'Model';
function isModel(item) {
    return exports.reflection.isInstance(item, exports.Model);
}
exports.isModel = isModel;
exports.Person = 'Person';
function isPerson(item) {
    return exports.reflection.isInstance(item, exports.Person);
}
exports.isPerson = isPerson;
class BlockMadnessAstReflection extends langium_1.AbstractAstReflection {
    getAllTypes() {
        return ['Goodbye', 'Greeting', 'Model', 'Person'];
    }
    computeIsSubtype(subtype, supertype) {
        switch (subtype) {
            default: {
                return false;
            }
        }
    }
    getReferenceType(refInfo) {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'Goodbye:person':
            case 'Greeting:person': {
                return exports.Person;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }
    getTypeMetaData(type) {
        switch (type) {
            case 'Model': {
                return {
                    name: 'Model',
                    mandatory: [
                        { name: 'goodbye', type: 'array' },
                        { name: 'greetings', type: 'array' },
                        { name: 'persons', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}
exports.BlockMadnessAstReflection = BlockMadnessAstReflection;
exports.reflection = new BlockMadnessAstReflection();
//# sourceMappingURL=ast.js.map