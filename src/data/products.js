export const skinTypeLabels = {
  oily: "Oily",
  dry: "Dry",
  "acne-prone": "Acne-Prone",
  sensitive: "Sensitive",
  combination: "Combination",
  normal: "Normal",
};

export const concernLabels = {
  acne: "Acne",
  "dark-spots": "Dark Spots",
  dullness: "Dullness",
  dryness: "Dryness",
  "oil-control": "Oil Control",
  "sun-protection": "Sun Protection",
  "sensitive-skin": "Sensitive Skin",
};

export const products = [
  {
    id: "p1",
    name: "Niacinamide 10% Clarifying Serum",
    category: "Serum",
    price: 28,
    rating: 4.7,
    reviews: 1284,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    skinTypes: ["oily", "acne-prone", "combination"],
    concerns: ["acne", "oil-control", "dark-spots"],
    ingredients: ["Niacinamide", "Zinc PCA", "Hyaluronic Acid"],
    benefits: ["Minimizes pores", "Controls excess oil", "Evens skin tone"],
    keyBenefit: "Balances oil and refines pores",
  },
  {
    id: "p2",
    name: "Hyaluronic Acid Hydrating Moisturizer",
    category: "Moisturizer",
    price: 36,
    rating: 4.8,
    reviews: 942,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["dryness", "sensitive-skin"],
    ingredients: ["Hyaluronic Acid", "Ceramides", "Squalane"],
    benefits: ["72-hour hydration", "Strengthens barrier", "Soothes skin"],
    keyBenefit: "Deep, lasting hydration without heaviness",
  },
  {
    id: "p3",
    name: "Mineral Defense SPF 50 Sunscreen",
    category: "Sunscreen",
    price: 42,
    rating: 4.9,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
    skinTypes: ["sensitive", "dry", "normal", "combination"],
    concerns: ["sun-protection", "sensitive-skin"],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Vitamin E"],
    benefits: ["Broad-spectrum SPF 50", "Reef-safe", "Non-irritating"],
    keyBenefit: "Gentle, invisible daily UV protection",
  },
  {
    id: "p4",
    name: "Green Tea Mattifying Moisturizer",
    category: "Moisturizer",
    price: 32,
    rating: 4.6,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    skinTypes: ["oily", "combination"],
    concerns: ["oil-control", "dullness"],
    ingredients: ["Green Tea Extract", "Glycerin", "Vitamin B5"],
    benefits: ["Lightweight finish", "Antioxidant-rich", "Mattifies"],
    keyBenefit: "Hydrates without adding shine",
  },
  {
    id: "p5",
    name: "Vitamin C Brightening Serum",
    category: "Serum",
    price: 48,
    rating: 4.7,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
    skinTypes: ["normal", "combination", "oily"],
    concerns: ["dark-spots", "dullness"],
    ingredients: ["15% Vitamin C", "Ferulic Acid", "Vitamin E"],
    benefits: ["Brightens complexion", "Fades dark spots", "Antioxidant shield"],
    keyBenefit: "Visibly brighter, more even skin in 4 weeks",
  },
  {
    id: "p6",
    name: "Centella Calming Repair Cream",
    category: "Moisturizer",
    price: 38,
    rating: 4.8,
    reviews: 821,
    image: "https://images.unsplash.com/photo-1585652757141-8837d6e07acd?w=800&q=80",
    skinTypes: ["sensitive", "acne-prone", "dry"],
    concerns: ["sensitive-skin", "acne"],
    ingredients: ["Centella Asiatica", "Panthenol", "Madecassoside"],
    benefits: ["Calms redness", "Repairs barrier", "Reduces irritation"],
    keyBenefit: "Soothes reactive, sensitized skin",
  },
  {
    id: "p7",
    name: "Salicylic Acid Pore Refining Toner",
    category: "Toner",
    price: 24,
    rating: 4.5,
    reviews: 956,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
    skinTypes: ["oily", "acne-prone", "combination"],
    concerns: ["acne", "oil-control"],
    ingredients: ["2% Salicylic Acid", "Witch Hazel", "Allantoin"],
    benefits: ["Unclogs pores", "Reduces breakouts", "Refines texture"],
    keyBenefit: "Clears congestion and prevents breakouts",
  },
  {
    id: "p8",
    name: "Squalane Nourishing Face Oil",
    category: "Face Oil",
    price: 44,
    rating: 4.9,
    reviews: 612,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
    skinTypes: ["dry", "normal", "sensitive"],
    concerns: ["dryness", "dullness"],
    ingredients: ["100% Squalane", "Rosehip Oil", "Vitamin E"],
    benefits: ["Locks in moisture", "Restores glow", "Non-comedogenic"],
    keyBenefit: "Drenches dry skin in lasting nourishment",
  },
];

export function recommendProducts(skinType, concerns) {
  return products
    .map((product) => {
      const matchesSkin = product.skinTypes.includes(skinType);
      const matchedConcerns = product.concerns.filter((c) => concerns.includes(c));
      const score = (matchesSkin ? 3 : 0) + matchedConcerns.length * 2;
      const maxPossible = 3 + Math.min(concerns.length, product.concerns.length) * 2;
      const baseMatch = maxPossible > 0 ? score / maxPossible : 0;
      const matchPercent = Math.round(
        Math.min(100, (matchesSkin ? 60 : 20) + matchedConcerns.length * 15 + baseMatch * 10),
      );

      const concernText =
        matchedConcerns.length > 0
          ? matchedConcerns.map((c) => concernLabels[c].toLowerCase()).join(", ")
          : "";

      let reason = "";
      if (matchesSkin && concernText) {
        reason = `Formulated for ${skinTypeLabels[skinType].toLowerCase()} skin and targets ${concernText}.`;
      } else if (matchesSkin) {
        reason = `Specifically suited to ${skinTypeLabels[skinType].toLowerCase()} skin with a balanced, gentle formula.`;
      } else if (concernText) {
        reason = `Helps address ${concernText}, supporting your routine.`;
      } else {
        reason = `A well-loved essential that complements most routines.`;
      }

      return { product, score, matchPercent, reason };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);
}
