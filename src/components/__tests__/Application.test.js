import React from "react";
import axios from "axios";

import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	getAllByTestId,
	prettyDOM,
	getByAltText,
	getByPlaceholderText,
	toBeInTheDocument,
	queryByText,
	getByTestId,
	getByDisplayValue,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
	it("defaults to Monday and changes the schedule when a new day is selected", () => {
		const { getByText } = render(<Application />);
		return waitForElement(() => getByText("Monday")).then(() => {
			fireEvent.click(getByText("Tuesday"));
			expect(getByText("Leopold Silvers"));
		});
	});

	it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
		const { container, debug } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment")[0];
		fireEvent.click(getByAltText(appointment, "Add"));
		fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "SAVING")).toBeInTheDocument();
		await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
		const day = getAllByTestId(container, "day").find((day) =>
			queryByText(day, "Monday")
		);
		expect(getByText(day, "no spots remaining")).toBeInTheDocument();
	});

	it("loads data, removes an interview and increases the spots remaining for Monday by 1", async () => {
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment")[1];
		fireEvent.click(getByAltText(appointment, "trash"));
		expect(
			getByText(appointment, "Are you sure you want to delete this?")
		).toBeInTheDocument();
		fireEvent.click(getByText(appointment, "Confirm"));
		expect(getByText(appointment, "DELETE")).toBeInTheDocument();
		const day = await waitForElement(() =>
			getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"))
		);
		expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
	});

	it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment")[1];
		fireEvent.click(getByAltText(appointment, "edit"));
		expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
		fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/), {
			target: { value: "Lydia Miller-Jones" },
		});
		expect(
			getByDisplayValue(appointment, "Lydia Miller-Jones")
		).toBeInTheDocument();
		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "SAVING")).toBeInTheDocument();
		await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
		const day = await waitForElement(() =>
			getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"))
		);
		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});

	it("shows the save error when failing to save an appointment", async () => {
		axios.put.mockRejectedValueOnce();
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment")[0];
		fireEvent.click(getByAltText(appointment, "Add"));
		fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "SAVING")).toBeInTheDocument();
		const day = await waitForElement(() =>
			getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"))
		);
		expect(
			getByText(appointment, "Could not save this interview")
		).toBeInTheDocument();
	});

	it("shows the delete error when failing to delete an appointment", async () => {
		axios.delete.mockRejectedValueOnce();
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment")[1];
		fireEvent.click(getByAltText(appointment, "trash"));
		expect(
			getByText(appointment, "Are you sure you want to delete this?")
		).toBeInTheDocument();
		fireEvent.click(getByText(appointment, "Confirm"));
		expect(getByText(appointment, "DELETE")).toBeInTheDocument();
		const day = await waitForElement(() =>
			getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"))
		);
		expect(
			getByText(appointment, "Could not delete this interview")
		).toBeInTheDocument();
	});
});
