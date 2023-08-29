import { ProductVariant, TypedMoney } from '@commercetools/platform-sdk';

type TempVariantProps = {
  variant: ProductVariant;
  className: string;
};

function getPriceValue(priceValue: TypedMoney) {
  return priceValue.fractionDigits === 2 ? priceValue.centAmount / 100 : priceValue.centAmount;
}

function TempVariant({ variant, className }: TempVariantProps) {
  if (!variant.prices || !variant.prices.length) {
    return <p>no price</p>;
  }
  const [priceData] = variant.prices;
  const price = getPriceValue(priceData.value);

  const discountedPrice = priceData.discounted ? getPriceValue(priceData.discounted.value) : null;

  return (
    <div className={className}>
      {variant.attributes &&
        variant.attributes.length &&
        variant.attributes.map((atr) => <p key={atr.value + atr.name}>{`${atr.name} -> ${atr.value}`}</p>)}
      <p>
        Price:{' '}
        {discountedPrice ? (
          <>
            <span>{price}</span>/<span>{discountedPrice}</span>
          </>
        ) : (
          <span>{price}</span>
        )}
      </p>
    </div>
  );
}

export default TempVariant;
