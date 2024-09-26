let data = [];
async function getData(dataSourceId, offset = 0) {
    const url = `https://api.baserow.io/api/builder/data-source/359124/dispatch/?offset=${offset}&count=20`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            //throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        data = data.concat(responseData.results);
        
        if (responseData.has_next_page) {
            const nextOffset = offset + 20;
            return getData(dataSourceId, nextOffset);
        } else {
            const temp = data;
            data = [];
            return temp;
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
        //throw error; // Propagate the error
    }
}

// Export the function to make it accessible from other files
export { getData };
