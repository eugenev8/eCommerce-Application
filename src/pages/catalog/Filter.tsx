import { FacetResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';

type FilterProps = {
  facet: [string, FacetResult];
};

export default function Filter({ facet }: FilterProps) {
  const [facetName, facetData] = facet;
  // const categories = useAppSelector((state) => state.categoriesReducer.categories);

  // function getCategoryNameById(id: string) {
  //   if (!categories) return 'Unknown category';
  //   const foundCategory = categories.find((category) => category.id === id);
  //   return foundCategory?.name['en-US'] || 'Unknown category';
  // }

  return (
    <div>
      <p>{facetName}</p>
      {facetData.type === 'terms' &&
        facetData.terms.map((term) => {
          return (
            <div key={term.term}>
              <span>{term.term}</span>
              ===
              <span>{term.count}</span>
            </div>
          );
        })}
    </div>
  );
}
