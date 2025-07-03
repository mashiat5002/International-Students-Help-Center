export async function call_decline_meetingReq(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/decline_meetingReq`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id }),
        });
        const final_res = await res.json();
        return final_res;
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ res: "error during declining meeting request" }));
    }
} 