export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:3000/upload", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.path; // backend return { path: "/uploads/xxx.jpg" }
}
