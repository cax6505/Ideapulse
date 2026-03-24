import publicAxios from "../../../api/axios";

const getBlog = async (id) => {
    const response = await publicAxios.get(`/blogs/${id}`);

    return response.data;
}

export default getBlog