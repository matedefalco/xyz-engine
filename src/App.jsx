import { useState } from "react"
import Papa from "papaparse"
import { useNavigate } from "react-router-dom"

function App() {
	const [step, setStep] = useState(1)
	const [projectInfo, setProjectInfo] = useState({
		projectName: "",
		projectDescription: "",
		client: "",
		constructor: "",
	})
	const [, setCsvFile] = useState(null)
	const [minMaxValues, setMinMaxValues] = useState({
		max_X: 0,
		min_X: 0,
		max_Y: 0,
		min_Y: 0,
		max_Z: 0,
		min_Z: 0,
	})
	const [step1Errors, setStep1Errors] = useState({})
	const [step2Errors, setStep2Errors] = useState({})

	const navigate = useNavigate()

	const handleNextStep = () => {
		if (step === 1) {
			if (validateStep1()) {
				setStep(step + 1)
			}
		} else {
			setStep(step + 1)
		}
	}

	const handleSetp1InputChange = (e) => {
		const { name, value } = e.target
		setProjectInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
	}

	const handleSetp2InputChange = (e) => {
		const { name, value } = e.target
		setMinMaxValues((prevInfo) => ({ ...prevInfo, [name]: value }))
	}

	const handleFileUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = function (e) {
				const content = e.target.result
				Papa.parse(content, {
					header: true,
					dynamicTyping: true,
					complete: (result) => {
						const csvData = result.data

						const { X, Y, Z } = csvData.reduce(
							(acc, entry) => {
								const { X, Y, Z } = entry
								acc.X.push(X)
								acc.Y.push(Y)
								acc.Z.push(Z)
								return acc
							},
							{ X: [], Y: [], Z: [] }
						)

						const minX = Math.min(...X)
						const maxX = Math.max(...X)
						const minY = Math.min(...Y)
						const maxY = Math.max(...Y)
						const minZ = Math.min(...Z)
						const maxZ = Math.max(...Z)

						setMinMaxValues({
							min_X: minX,
							max_X: maxX,
							min_Y: minY,
							max_Y: maxY,
							min_Z: minZ,
							max_Z: maxZ,
						})
						setCsvFile(csvData)
					},
				})
			}
			reader.readAsText(file)
		}
	}

	const validateStep1 = () => {
		const errors = {}
		if (!projectInfo.projectName) {
			errors.projectName = "Project Name is required."
		}
		if (!projectInfo.projectDescription) {
			errors.projectDescription = "Description is required."
		}
		if (!projectInfo.client) {
			errors.client = "Client is required."
		}
		if (!projectInfo.constructor) {
			errors.constructor = "Constructor is required."
		}
		setStep1Errors(errors)
		return Object.keys(errors).length === 0
	}

	const validateStep2 = () => {
		const errors = {}
		if (minMaxValues.min_X === 0 || minMaxValues.max_X === 0) {
			errors.min_X = "Min X and Max X must be nonzero."
		}
		if (minMaxValues.min_Y === 0 || minMaxValues.max_Y === 0) {
			errors.min_Y = "Min Y and Max Y must be nonzero."
		}
		if (minMaxValues.min_Z === 0 || minMaxValues.max_Z === 0) {
			errors.min_Z = "Min Z and Max Z must be nonzero."
		}
		setStep2Errors(errors)
		return Object.keys(errors).length === 0
	}

	const isStep1Valid =
		projectInfo.projectName &&
		projectInfo.projectDescription &&
		projectInfo.client &&
		projectInfo.constructor

	const handleShowResults = (e) => {
		e.preventDefault()
		if (isStep1Valid && validateStep2()) {
			navigate("/results", {
				state: {
					projectName: projectInfo.projectName,
					projectDescription: projectInfo.projectDescription,
					client: projectInfo.client,
					constructor: projectInfo.constructor,
					minMaxValues: minMaxValues,
				},
			})
		}
	}

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-6">
			{step === 1 && (
				<form className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-gray-800 shadow-md">
					<h1 className="text-white text-2xl font-semibold">XYZ ENGINE</h1>
					{Object.keys(projectInfo).map((key) => (
						<div key={key} className="flex flex-col gap-1">
							<label className="text-white">
								{key.charAt(0).toUpperCase() + key.slice(1)}:
							</label>
							<input
								className="bg-gray-700 text-white rounded-md p-2"
								type="text"
								name={key}
								value={projectInfo[key]}
								onChange={handleSetp1InputChange}
							/>
							{step1Errors[key] && (
								<p className="text-red-500">{step1Errors[key]}</p>
							)}
						</div>
					))}
					<button
						type="button"
						className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring"
						onClick={handleNextStep}
					>
						Next
					</button>
				</form>
			)}
			{step === 2 && (
				<div className="flex flex-col items-center justify-center gap-4">
					<h2 className="text-xl font-semibold">
						Step 2: Additional Information
					</h2>
					<div className="p-4 bg-gray-800 rounded-lg shadow-md">
						{Object.keys(projectInfo).map((key) => (
							<div key={key} className="flex gap-1">
								<p className="text-white">
									{key.charAt(0).toUpperCase() + key.slice(1)}:
								</p>
								<p className="text-white font-bold">{projectInfo[key]}</p>
							</div>
						))}
					</div>
					<form className="flex flex-col items-center gap-4 p-4 rounded-xl border border-2 border-gray-800 border-solid">
						<p className="text-white bg-gray-700 p-2">
							💡 Upload the file, or type them manually
						</p>
						<input
							type="file"
							className="flex justify-center"
							onChange={handleFileUpload}
							accept=".csv"
						/>
						<div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg shadow-md">
							{Object.keys(minMaxValues).map((key) => (
								<div key={key} className="flex flex-col gap-1">
									<label className="text-white min-w-50">
										{key.replace("_", " ")}
									</label>
									<input
										className="bg-gray-700 text-white rounded-md p-2"
										type="number"
										name={key}
										value={minMaxValues[key]}
										onChange={handleSetp2InputChange}
										step="0.01"
									/>
									{step2Errors[key] && (
										<p className="text-red-500">{step2Errors[key]}</p>
									)}
								</div>
							))}
						</div>
						<button
							type="submit"
							className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring"
							onClick={handleShowResults}
						>
							Show Results
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default App
