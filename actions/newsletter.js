"use server"


export const handleData = async (formData) => {
    const email = formData.get("email")

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/newsletter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const error = await response.json();
            return {error: error.message}
        }
    } catch (error) {
        return {error: "something went wrong"}
    }
};