export async function fetchGet(url) {
    let result;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        result = await response.json();
    } catch (error) {
        console.error(error);
    }
    return result;
}

export async function fetchPost(url, body) {
    let result;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = new Error(`HTTP error! status: ${response.status}`);
            throw error;
        }

        result = await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
    return result;
}

export async function fetchPut(url, body) {
    let result;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = new Error(`HTTP error! status: ${response.status}`);
            throw error;
        }

        result = await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
    return result;
}

export async function fetchDelete(url, body) {
    let result;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = new Error(`HTTP error! status: ${response.status}`);
            throw error;
        }

        result = await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
    return result;
}