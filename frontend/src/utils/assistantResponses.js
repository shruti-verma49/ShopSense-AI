export function getAssistantResponse(message, products) {
  const text = message.toLowerCase();

  if (text.includes("return") || text.includes("refund")) {
    return {
      reply: "We offer a 7-day return policy on most items. You can request a return from your Order Details page within 7 days of delivery.",
      products: [],
    };
  }

  if (text.includes("shipping") || text.includes("delivery")) {
    return {
      reply: "We offer free delivery on orders above ₹999. Standard delivery takes about 5 days.",
      products: [],
    };
  }

  if (text.includes("laptop") && (text.includes("best") || text.includes("recommend"))) {
    const laptops = products.filter(
      (p) => p.category === "Electronics" && p.title.toLowerCase().includes("laptop")
    );
    const best = [...laptops].sort((a, b) => b.rating - a.rating)[0];
    return {
      reply: best
        ? `Based on ratings, I'd recommend "${best.title}" — it has a ${best.rating}★ rating.`
        : "I couldn't find a laptop in our current catalog, but check back soon!",
      products: best ? [best] : [],
    };
  }

  const priceMatch = text.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
  if (priceMatch) {
    const maxPrice = Number(priceMatch[1]);
    const matches = products
      .filter((p) => p.price <= maxPrice)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
    return {
      reply: matches.length
        ? `Here's what I found under ₹${maxPrice}:`
        : `I couldn't find anything under ₹${maxPrice} right now — try a higher budget?`,
      products: matches,
    };
  }

  const knownCategories = [...new Set(products.map((p) => p.category))];
  const categoryMatch = knownCategories.find((category) => text.includes(category.toLowerCase()));
  if (categoryMatch) {
    const matches = products.filter((p) => p.category === categoryMatch).slice(0, 4);
    return {
      reply: matches.length
        ? `Here are some ${categoryMatch} products you might like:`
        : `I don't see any ${categoryMatch} products in stock right now.`,
      products: matches,
    };
  }

  if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
    return {
      reply: "Hi there! I can help you find products, check prices, or answer questions about shipping and returns. What are you looking for?",
      products: [],
    };
  }

  return {
    reply: "I'm not sure about that yet, but I can help you find products by category or price, or answer questions about shipping and returns. Try something like \"show me gaming products\" or \"shoes under ₹2000\".",
    products: [],
  };
}