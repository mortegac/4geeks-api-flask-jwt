import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="row w-100 d-flex justify-content-center">
			<div className="col-5">
				<div className="text-center mt-5">
					<h1>Ingrese sus acccesos</h1>

					{/* <div className="alert alert-info">{store.message || "Loading message from the backend..."}</div> */}
					<form>
						<div className="mb-3">
							<label className="form-label">Email address</label>
							<input type="email" className="form-control" aria-describedby="emailHelp" />
						</div>
						<div className="mb-3">
							<label className="form-label">Password</label>
							<input type="password" className="form-control" />
						</div>
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
