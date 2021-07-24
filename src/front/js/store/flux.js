const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {
				expires: "",
				token: "",
				username: "",
				email: "",
				userId: "",
				userName: ""
			},
			message: "",
			userList: []
		},

		actions: {
			getToken: () => {
				const tokenLocal = localStorage.getItem("token");
				const userLocal = JSON.parse(localStorage.getItem("user"));
				setStore({
					user: {
						token: tokenLocal,
						user: userLocal
					}
				});
				console.log("-->", tokenLocal);
				console.log("-->", JSON.stringify(userLocal));
			},
			setLogin: (user) => {

				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json; charset=UTF-8" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log("--data--", data);
						if (data.hasOwnProperty("token")) {
							const dataUser = {
								expires: data.expires,
								token: data.token,
								username: data.username,
								email: data.user.email,
								userId: data.userId,
								userName: data.userName
							};
							setStore({ user: { ...dataUser } });

							console.log("--USER--", dataUser);

							if (typeof Storage !== "undefined") {
								localStorage.setItem("token", data.token);
								localStorage.setItem("user", JSON.stringify(data.user));
							} else {
								// LocalStorage no soportado en este navegador
							}
						} else {
							setStore({ message: data.msg });
						}
					})
					.catch(error => console.log("Error loading message from backend", error));
			},

			getMessage: () => {
				fetch(process.env.BACKEND_URL + "/api/users")
					.then(resp => resp.json())
					.then(data => setStore({ userList: [...data.users] }))
					.catch(error => console.log("Error loading message from backend", error));
			}

			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
		}
	};
};

export default getState;
