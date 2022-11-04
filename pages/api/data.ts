// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import attributes from '../../data/attributes.json';
import facts from '../../data/facts.json';
import securities from '../../data/securities.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const { a, b } = req.body.expression;
  const { security } = req.body;

  const securityId = securities.find(sec => sec.symbol === security)?.id;

  if (!securityId) {
    res.json({
      error: 'The value given to \'security\' was unable to resolve. Are you sure it\'s correct?',
    })
  }

  const attributeA = attributes.find(att => typeof a === 'string' ? att.name === a : att.id === a)?.id;

  if (!attributeA) res.json({
    error: `An invalid value passed on property 'a': '${a}' not found.`
  })

  const attributeB = attributes.find(att => typeof b === 'string' ? att.name === b : att.id === b)?.id;

  if (!attributeB) res.json({
    error: `An invalid value passed on property 'b': '${b}' not found.`
  })

  const factA = facts.find(fact => fact.attribute_id === attributeA && fact.security_id === securityId);
  const factB = facts.find(fact => fact.attribute_id === attributeB && fact.security_id === securityId);

  res.json({
    error: false,
    a: factA?.value,
    b: factB?.value,
  })
}
