export async function call_push_document(form: FormData) {
    console.log(form);
    const res = await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/push_document`, {
        method: "POST",
        body: form,
    });
    const final_res = await res.json();
    return final_res;
} 