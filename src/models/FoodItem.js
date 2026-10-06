import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, required: true, min: 0 },
  discountedPrice: { type: Number, required: true, min: 0 },

  // Dietary tags (used by the filters on /food)
  isVegan: { type: Boolean, default: false },
  isHalal: { type: Boolean, default: false },

  // Used by GET /api/food to calculate the dynamic expiry discount.
  // Older items without it fall back to createdAt + 4 hours.
  expiryTime: { type: Date },

  // Which approved restaurant posted this item (set from the logged-in user on /add-food)
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  restaurantName: { type: String },
  restaurantAddress: { type: String },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.FoodItem || mongoose.model('FoodItem', FoodItemSchema);
