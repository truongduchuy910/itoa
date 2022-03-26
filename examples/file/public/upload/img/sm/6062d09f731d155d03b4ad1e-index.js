const updateById = async ({ name, url, graphql, query, id, token }) => {
  try {
    const response = await axios({
      method: "GET",
      url: encodeURI(url),
      responseType: "stream",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        "User-Agent": fakeUa(),
      },
    });
    const path = `./${name}`;
    const body = {
      query,
      variables: { id, file: null },
    };
    await response.data.pipe(
      fs.createWriteStream(path).on("finish", async () => {
        let map = {
          0: ["variables.file"],
        };
        let formData = new FormData();
        formData.append("operations", JSON.stringify(body));
        formData.append("map", JSON.stringify(map));
        formData.append(0, fs.createReadStream(path), { filename: name });
        try {
          let {
            data: { data, errors },
          } = await axios.post(graphql, formData, {
            headers: {
              ...formData.getHeaders(),
              authorization: `Bearer ${token}`,
            },
          });
          fs.unlinkSync(path);
          console.log(JSON.stringify(data));
          console.log(JSON.stringify(errors));
        } catch {
          console.log("cannot upload");
        }
      })
    );
  } catch (e) {
    console.log("cannot download", url);
  }
};
