import { ProductVariant } from '@commercetools/platform-sdk';

type TempVariantProps = {
  variant: ProductVariant;
  className: string;
};

function TempVariant({ variant, className }: TempVariantProps) {
  const priceData = variant.prices?.find((price) => price.country === 'US')?.value;

  // eslint-disable-next-line no-nested-ternary
  const price = priceData ? (priceData.fractionDigits ? priceData.centAmount / 100 : priceData.centAmount) : 33;

  return (
    <div className={className}>
      {variant.attributes &&
        variant.attributes.length &&
        variant.attributes.map((atr) => <p key={atr.value + atr.name}>{`${atr.name} -> ${atr.value}`}</p>)}
      <p>Price: {price}</p>
    </div>
  );
}

export default TempVariant;
