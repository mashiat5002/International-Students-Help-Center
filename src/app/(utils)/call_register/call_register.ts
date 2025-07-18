export async function call_register(fullName: string, email: string, password: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                fullName: fullName,
                password: password,
            }),
        });
        return res;
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ res: "error during registration" }));
    }
} 