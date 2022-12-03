
const uploadFileEle = document.getElementById("fileInput"); //for upload file
const uploadFileForm = document.getElementById('uploadFileForm');
const errMsg = document.getElementById("errMsg");
const validMsg = document.getElementById("validMsg");


uploadFileForm.addEventListener("submit" , async e => {

    e.preventDefault();

    if (uploadFileEle.value === "") {
        e.preventDefault();
        errMsg.style.display = "block";
    }

    const response = await result();
    if(response.message === "all done! users from csv imported to json file") {
        validMsg.style.display ="block";
    } else {
    errMsg.style.display = "block";
    console.log(response.message);
}

});

uploadFileEle.addEventListener("focus", (e) => {
    e.preventDefault();
    errMsg.style.display = "none";
    validMsg.style.display = "none";
});

    const result = async () => {

        const file = uploadFileEle.files[0];

        try {
            const bulkResponse = await fetch(
                        `http://localhost:4000/api/bulkImport?filename=${file.name}` , {
                    method: 'POST'
                }
            );
            return bulkResponse.json();
        } catch (error) {
            throw error;
        }
    }
