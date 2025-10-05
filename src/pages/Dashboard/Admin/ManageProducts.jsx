import { useEffect, useState } from "react";
import {
  createProduct,
  getCategories,
  getCompanies,
  getSizes,
  deleteProduct,
  getProducts,
} from "../../../services/productService.js";

export default function ManageProducts() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    // fetch dropdown data
    getCategories().then(setCategories);
    getCompanies().then(setCompanies);
    getSizes().then(setSizes);
    getProducts().then(setProducts);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !company || !price)
      return alert("Fill all required fields");

    try {
      const payload = {
        name,
        category,
        company,
        imageUrl: imageUrl || null, // send image URL instead of file
        variants: [{ size: size || null, price: Number(price), company }],
      };

      const res = await createProduct(payload);
      alert("Product created successfully!");
      console.log(res);

      // reset form
      setName("");
      setCategory("");
      setCompany("");
      setSize("");
      setPrice("");
      setImageUrl("");
    } catch (err) {
      console.error(err);
      alert("Error creating product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteProduct(id);
      alert("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== id)); // update list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id} className="text-black">
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c._id} value={c._id} className="text-black">
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Size (Optional)</option>
          {sizes.map((s) => (
            <option key={s._id} value={s._id} className="text-black">
              {s.value}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Image URL (Optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Manage Existing Products</h2>
      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{p.name}</span>
            <button
              onClick={() => handleDelete(p._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
