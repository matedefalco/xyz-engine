import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CSVSelector from "./components/CSVSelector"

function App() {
	const _x = []
	const _y = []
	const _z = []

	const [step, setStep] = useState(1)
	const [projectInfo, setProjectInfo] = useState({
		projectName: "",
		projectDescription: "",
		client: "",
		constructor: "",
	})
	const [csvFile, setCsvFile] = useState([])
	const [minMaxValues, setMinMaxValues] = useState({
		min_X: Number.POSITIVE_INFINITY,
		min_Y: Number.POSITIVE_INFINITY,
		min_Z: Number.POSITIVE_INFINITY,
		max_X: Number.NEGATIVE_INFINITY,
		max_Y: Number.NEGATIVE_INFINITY,
		max_Z: Number.NEGATIVE_INFINITY,
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

	const handleSetp1InputChange = ({ target }) => {
		const { name, value } = target
		setProjectInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
	}

	const handleSetp2InputChange = ({ target }) => {
		const { name, value } = target
		setMinMaxValues((prevInfo) => ({ ...prevInfo, [name]: value }))
	}

	useEffect(() => {
		const newMinMaxValues = { ...minMaxValues }

		if (csvFile.length > 0) {
			csvFile.forEach((line, index) => {
				const [_, x, y, z] = line
				const X = parseFloat(x)
				const Y = parseFloat(y)
				const Z = parseFloat(z)
				if (index > 0) {
					_x.push(X)
					_y.push(Y)
					_z.push(Z)
				}
			})
			setMinMaxValues(newMinMaxValues)
		}

		newMinMaxValues.min_X = Math.min(..._x)
		newMinMaxValues.min_Y = Math.min(..._y)
		newMinMaxValues.min_Z = Math.min(..._z)
		newMinMaxValues.max_X = Math.max(..._x)
		newMinMaxValues.max_Y = Math.max(..._y)
		newMinMaxValues.max_Z = Math.max(..._z)
		console.log(
			"Suka ~ file: App.jsx:70 ~ newMinMaxValues.min_X:",
			newMinMaxValues.min_X
		)
	}, [csvFile])

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
		const axisLabels = ["X", "Y", "Z"]

		axisLabels.forEach((axis) => {
			const minKey = `min_${axis}`
			const maxKey = `max_${axis}`

			if (minMaxValues[minKey] === 0 || minMaxValues[maxKey] === 0) {
				errors[minKey] = `Min_${axis} & Max_${axis} must be nonzero.`
			}
		})

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
		<div className="flex flex-col items-center justify-center gap-4 my-8">
			{step === 1 && (
				<div className="artboard phone-1">
					<form className="flex flex-col items-center justify-center gap-4 w-full h-full p-6 rounded-lg bg-gray-800 shadow-md">
						<h1 className="text-white text-2xl font-semibold">XYZ ENGINE</h1>
						{Object.keys(projectInfo).map((key) => (
							<div key={key} className="flex flex-col gap-1">
								<label className="text-white">
									{key.charAt(0).toUpperCase() + key.slice(1)}:
								</label>
								<input
									className="input input-bordered w-full max-w-xs"
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
							className="btn btn-primary"
							onClick={handleNextStep}
						>
							Next
						</button>
					</form>
				</div>
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
						<div className="alert">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="stroke-info shrink-0 w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<span>Upload the file, or type them manually</span>
						</div>
						<CSVSelector onChange={(_data) => setCsvFile(_data)}></CSVSelector>
						<div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg w-80 shadow-md">
							{Object.keys(minMaxValues).map((key) => (
								<div key={key} className="flex flex-col gap-1">
									<label className="text-white min-w-50">
										{key.replace("_", " ")}
									</label>
									<input
										className="input input-bordered w-full max-w-xs"
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
							className="btn btn-primary"
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
