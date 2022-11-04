import { FullExpression } from "../models/expression";
import { Operators } from "./operators";

async function getData(input: FullExpression) {
    return await (
        await fetch(`http://localhost:3000/api/data/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
    ).json();
}

export default async function calculateExpression(input: FullExpression) {
    try {
        const data = await getData(input);
        if (data.error) throw data;
        return {
            error: false,
            result: Operators[input.expression.fn](data.a,data.b)
        };
    } catch (e) {
        return e;
    }

}