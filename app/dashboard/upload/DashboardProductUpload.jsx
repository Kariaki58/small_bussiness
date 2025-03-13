"use client";

import { useRef, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import CreatableSelect from "react-select/creatable";

export default function DashboardProductUpload() {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);
    const [description, setDescription] = useState("");
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        basePrice: "",
        category: { label: "Electronics", value: "Electronics" },
        variants: [],
    });
    const [showVariants, setShowVariants] = useState(true);
    
    const categoryOptions = [
        { label: "Electronics", value: "Electronics" },
        { label: "Clothing", value: "Clothing" },
        { label: "Books", value: "Books" },
    ];

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("quill").then((Quill) => {
                if (editorRef.current && !quillInstance.current) {
                    quillInstance.current = new Quill.default(editorRef.current, {
                        theme: "snow",
                        modules: {
                            toolbar: [
                                [{ header: [1, 2, 3, false] }],
                                ["bold", "italic", "underline", "strike"],
                                [{ color: [] }, { background: [] }],
                                [{ align: [] }],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["image", "video", "blockquote", "code-block"],
                                ["clean"],
                            ],
                        },
                    });

                    quillInstance.current.on("text-change", () => {
                        setDescription(quillInstance.current.root.innerHTML);
                    });
                }
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleCategoryChange = (selectedOption) => {
        setFormData({ ...formData, category: selectedOption });
    };

    const handleAddVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { color: "", images: [], sizes: "" }],
        });
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...formData.variants];
        newVariants[index][field] = value;
        setFormData({ ...formData, variants: newVariants });
    };

    const handleVariantImageChange = (index, files) => {
        const newVariants = [...formData.variants];
        newVariants[index].images = Array.from(files);
        setFormData({ ...formData, variants: newVariants });
    };

    const handleRemoveVariant = (index) => {
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData({ ...formData, variants: newVariants });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/dashboard/products', {
            methods: 'POST',
            body: JSON.stringify({ ...formData, description }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-6 border rounded-lg shadow-lg bg-white">
            <div>
                <label htmlFor="productName" className="block font-semibold">Product Name</label>
                <input
                    className="w-full p-2 border rounded"
                    type="text"
                    id="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="price" className="block font-semibold">Price</label>
                    <input
                        className="w-full p-2 border rounded"
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="basePrice" className="block font-semibold">Base Price</label>
                    <input
                        className="w-full p-2 border rounded"
                        type="number"
                        id="basePrice"
                        value={formData.basePrice}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block font-semibold">Category</label>
                <CreatableSelect
                    className="w-full"
                    options={categoryOptions}
                    value={formData.category}
                    onChange={handleCategoryChange}
                    isClearable
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button type="button" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleAddVariant}>
                    Add Variant
                </button>
                <button type="button" className="w-full p-2 mt-2 md:mt-0 bg-gray-500 text-white rounded hover:bg-gray-700" onClick={() => setShowVariants(!showVariants)}>
                    {showVariants ? "Hide Variants" : "Show Variants"}
                </button>
            </div>

            {showVariants && formData.variants.map((variant, index) => (
                <div key={index} className="p-4 border rounded bg-gray-100 mt-4">
                    <input type="text" placeholder="Color" className="w-full p-2 border rounded mb-2" value={variant.color} onChange={(e) => handleVariantChange(index, "color", e.target.value)} />
                    <input type="file" multiple accept="image/*" className="w-full p-2 border rounded mb-2" onChange={(e) => handleVariantImageChange(index, e.target.files)} />
                    <input type="text" placeholder="Sizes (comma-separated)" className="w-full p-2 border rounded mb-2" value={variant.sizes} onChange={(e) => handleVariantChange(index, "sizes", e.target.value)} />
                    <button type="button" className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => handleRemoveVariant(index)}>Remove Variant</button>
                </div>
            ))}
            <div>
                <label className="block font-semibold">Product Description</label>
                <div ref={editorRef} className="w-full h-40 border rounded bg-white"></div>
            </div>

            <button type="submit" className="w-full p-3 text-white bg-fuchsia-500 rounded hover:bg-fuchsia-700 cursor-pointer">
                Upload Product
            </button>
        </form>
    );
}
