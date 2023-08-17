import { useLocation } from "react-router-dom"

const Results = () => {
	const location = useLocation()
	const { projectName, projectDescription, client, constructor, minMaxValues } =
		location.state

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
			<table className="table-auto bg-gray-800 rounded-lg shadow-md p-4">
				<thead>
					<tr>
						<th className="p-2 text-white">Field</th>
						<th className="p-2 text-white">Value</th>
					</tr>
				</thead>
				<tbody>
					{fields.map((field, index) => (
						<tr key={index}>
							<td className="p-2 text-white font-semibold">{field.label}</td>
							<td className="p-2 text-white">{field.value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Results
