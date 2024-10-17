# Design System Coverage Checker

This is a Figma plugin that checks the coverage of the components from a specified Design System in the selected artboard. It provides a visual representation of the percentage of Design System components used, along with the total number of layers and non-Design System components.

## Features

- Check the coverage of Design System components in the selected artboard.
- Visually display the percentage of Design System components used.
- Show the total number of layers and non-Design System components.
- Provide a list of non-Design System components for easy identification.
- Highlight and inspect individual non-Design System components in the Figma canvas.

## Usage

1. Install the plugin in your Figma project.
2. Select the artboard you want to analyze.
3. Click the "Check Components" button in the plugin UI.
4. The plugin will analyze the selected artboard and display the following information:
   - Percentage of Design System components used (represented by a bar graph).
   - Total number of layers in the artboard.
   - Number of non-Design System components.
5. Click the "Non-Design System Components" count box to open a modal that lists all the non-Design System components.
6. You can click on a component name in the list to highlight and inspect it in the Figma canvas.

## Configuration

You need to set the custom metadata `Design System` to `True` for all the components that belong to your Design System. This can be done by selecting the components and using the `setPluginData` method in the Figma API.

## Contributing

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
