module.exports = ({github, context}) => {
	console.log("Hey Mom!")
  return context.payload.client_payload.value
}