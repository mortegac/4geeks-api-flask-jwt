import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import llamaFea from "../../img/llama-fea.jpg";
import llama from "../../img/llama.jpeg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handlerClick = e => {
		e.preventDefault();

		actions.setLogin({
			email: email,
			password: password
		});
	};

	useEffect(() => {
		actions.getToken();
	}, []);

	return (
		<div className="row w-100 d-flex justify-content-center">
			<div className="col-5">
				{store.user.token !== null ? (
					<div className="text-center mt-5">
						{/* <span>User: {JSON.stringify(store.user)}</span> */}
						<div className="card" style={{ width: "18rem" }}>
							<img className="card-img-top" src={llama} />
							<div className="card-body">
								<span>User: {JSON.stringify(store.user)}</span>
							</div>
						</div>
					</div>
				) : (
					<div className="text-center mt-5">
						<h1>Ingrese sus acccesos</h1>

						<form>
							<div className="mb-3">
								<label className="form-label">Email address</label>
								<input
									value={email}
									onChange={e => setEmail(e.target.value)}
									type="email"
									className="form-control"
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Password</label>
								<input
									value={password}
									onChange={e => setPassword(e.target.value)}
									type="password"
									className="form-control"
								/>
							</div>
							<button type="submit" onClick={e => handlerClick(e)} className="btn btn-primary">
								Submit
							</button>

							<div className="text-danger overflow-auto my-5">{store.message}</div>

							{store.userList.length > 0 ? (
								<div className="alert alert-info overflow-auto">
									<ul>
										{store.userList.map((item, index) => (
											<li key={index}>{item.email}</li>
										))}
									</ul>
								</div>
							) : null}
						</form>
					</div>
				)}
			</div>
		</div>
	);
};
