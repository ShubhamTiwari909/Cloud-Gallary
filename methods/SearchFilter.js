export const searchFilter = (data,search) => {
    if (search === "" || search.startsWith(" ")) {
        return data
    }
    else {
        return data.folderName.toUpperCase().startsWith(search.toUpperCase())
    }
}

