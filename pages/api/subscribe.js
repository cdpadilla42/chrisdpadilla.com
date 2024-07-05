import Subscription from "../../database/subscription";
import mailer from "../../mailer";


export default async function handler(req, res) {
	const existingSub = await Subscription.findOne({email: req.body.email}, {frequency: req.body.frequency});

	if (existingSub) {
		const updateRes = await Subscription.findOneAndUpdate({email: req.body.email}, {frequency: req.body.frequency});
		return res.status(200).json({message: `Updated subscription: ${JSON.stringify(updateRes)}`})
	}

	var user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		frequency: req.body.frequency,
	};
	
	var sub = new Subscription({
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
