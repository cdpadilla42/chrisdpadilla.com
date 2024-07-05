import subscription from "../../database/subscription";
import mailer from "../../mailer";


export default async function handler(req, res) {
	console.log(req)
	var user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	};

	var sub = new subscription({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
	});

	const errs = [];
	
	
	console.log("saving")
	await sub.save().then(function (res, err) {
		if (err) {
			errs.push(err);
		}
		
		console.log('New subscription { ' + user.firstName + " " + user.lastName + ':' + user.email + ' } has been saved successfully!');
	});
	
	console.log("sending...")
	await mailer.send(user, function (err, result) {
			if(err) {
					console.log(err);
					errs.push(err);
			}
	});

	if (errs.length) {
		console.log(errs)
		return res.status(500).json({errs})
	}

	return res.status(200).json({message: "ok"})
}
