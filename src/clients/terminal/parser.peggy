Expression
  = AddExpression

AddExpression
  = head:ApplyExpression tail:(_ ("+" / "-") _ ApplyExpression)* {
      return tail.reduce((leftExpression, [, operator, , rightExpression]) => ({
        type: "OperatorExpression",
        operator,
        leftExpression,
        rightExpression,
        location: location(),
       }), head);
    }

ApplyExpression
  = expression:PrimaryExpression _arguments:(_ PrimaryExpression)* {
      return _arguments.reduce((expression, [, argumentExpression]) => ({
        type: "ApplyExpression",
        expression,
        argumentExpression,
      }), expression);
    }

PrimaryExpression
  = "(" head:Expression ")" {
    return head;
  }
  / NumericLiteral
  / Identifier

NumericLiteral "number"
  = value:([0-9]+ ("." !"." [0-9]+)?) {
    return ({
      type: "NumericLiteral",
      value: Number(`${value[0].join("")}.${value[1] ? value[1][2].join("") : ""}`),
      location: location()
    });
  }

Identifier "identifier"
  = _ name:([_a-zA-Z][_a-zA-Z0-9]*) _ {
      return ({
        type: 'Identifier',
        name: name[0] + name[1].join('')
      });
    }

_ "space"
  = " "*
