import PropTypes from "prop-types"

const CSVSelector = ({ onChange }) => {
	const handleFileChange = async (e) => {
		if (e.target.files) {
			try {
				const file = e.target.files[0]

				const fileUrl = URL.createObjectURL(file)
				const response = await fetch(fileUrl)
				const text = await response.text()
				const lines = text.split("\n")
				const _data = lines.map((line) => line.split(","))

				onChange(_data)
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<input
			type="file"
			accept=".csv"
			onChange={handleFileChange}
			className="file-input w-full max-w-xs"
		/>
	)
}

CSVSelector.propTypes = {
	onChange: PropTypes.func.isRequired,
}

export default CSVSelector
