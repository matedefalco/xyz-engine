import { useLocation } from "react-router-dom"
import { Button } from "reactstrap"
import jsPDF from "jspdf"

const Results = () => {
	const location = useLocation()
	const { projectName, projectDescription, client, constructor, minMaxValues } =
		location.state

	const pdfGenerate = () => {
		const doc = new jsPDF("landscape", "px", "a4", "false")
		doc.text("Project Information", 10, 10)

		doc.text("Project Name: " + projectName, 10, 30)
		doc.text("Description: " + projectDescription, 10, 40)
		doc.text("Client: " + client, 10, 50)
		doc.text("Constructor: " + constructor, 10, 60)
		doc.text("Min X: " + minMaxValues.min_X, 10, 70)
		doc.text("Max X: " + minMaxValues.max_X, 10, 80)
		doc.text("Min Y: " + minMaxValues.min_Y, 10, 90)
		doc.text("Max Y: " + minMaxValues.max_Y, 10, 100)
		doc.text("Min Z: " + minMaxValues.min_Z, 10, 110)
		doc.text("Max Z: " + minMaxValues.max_Z, 10, 120)

		doc.save("results.pdf")
	}

	const fields = [
		{ label: "Project Name", value: projectName },
		{ label: "Description", value: projectDescription },
		{ label: "Client", value: client },
		{ label: "Constructor", value: constructor },
		{ label: "Min X", value: minMaxValues.min_X },
		{ label: "Max X", value: minMaxValues.max_X },
		{ label: "Min Y", value: minMaxValues.min_Y },
		{ label: "Max Y", value: minMaxValues.max_Y },
		{ label: "Min Z", value: minMaxValues.min_Z },
		{ label: "Max Z", value: minMaxValues.max_Z },
	]

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-6">
			<h1 className="text-2xl font-semibold">Results</h1>
			<table className="table">
				<thead>
					<tr>
						<th>Field</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{fields.map((field, index) => (
						<tr key={index}>
							<td>{field.label}</td>
							<td>{field.value}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Button className="btn btn-primary" onClick={pdfGenerate}>
				Download PDF
			</Button>
		</div>
	)
}

export default Results
