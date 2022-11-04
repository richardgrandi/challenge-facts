export interface FullExpression {
    expression: Expression;
    security: string;
}

export interface Expression {
    fn: '*' | '-' | '+' | '/';
    a: string|number|Expression;
    b: string|number|Expression;
}