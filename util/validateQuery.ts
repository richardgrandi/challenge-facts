import { Expression } from "../models/expression";

interface SchemaObject {
    expression: Expression,
    security: string,
}

function validateJson(query: string) {
    try {
        JSON.parse(query);
        return true;
    } catch (e) {
        if (e instanceof Error) {
            return new Error(`Invalid JSON Expression: ${e.message}`);
        } else if (typeof e === 'string') {
            return new Error(`Invalid JSON Expression: ${e}`);
        } else {
            return new Error('Invalid JSON Expression');
        }
    }
}

function validateExpression(expression:Expression | Object): expression is Expression {
    return (<Expression>expression).fn !== undefined &&
     (<Expression>expression).a !== undefined &&
     (<Expression>expression).b !== undefined;
}

function validateSchema(schema: SchemaObject | Object): schema is SchemaObject {
    return (<SchemaObject>schema).expression !== undefined && 
    (<SchemaObject>schema).security !== undefined;
}


export default function validateQuery(query:string) {
    // check json first
    const jsonValid = validateJson(query);
    if (jsonValid !== true) return jsonValid.message;

    //check schema second
    const schemaValid = validateSchema(JSON.parse(query));
    if (schemaValid !== true) return 'Schema Validation Error';

    // expression validation
    const expressionValid = validateExpression(JSON.parse(query).expression);
    if (expressionValid !== true) return 'Expression Validation Error';

    return true;
}