// Show the plugin UI
figma.showUI(__html__, { width: 420, height: 530 });

// Variables for correct styles from the Dashboard Design System
const allowedTextStyles = ["TextStyleID1", "TextStyleID2"]; // Add your allowed text style IDs here
const allowedShadowStyles = ["ShadowStyleID1", "ShadowStyleID2"]; // Add your allowed shadow style IDs here
const allowedColorVariables = ["ColorVariableID1", "ColorVariableID2"]; // Add your allowed color variable IDs here

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === "check-components") {
    const result = await checkComponents(); // Await the checkComponents call
    figma.ui.postMessage(result);
  }

  if (msg.type === "inspect-item") {
    const node = figma.getNodeById(msg.itemId);
    if (node) {
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
    } else {
      figma.notify("Component not found");
    }
  }
};

// Function to check if a component is from the Dashboard Design System
function isDesignSystemComponent(node) {
  // Only check instances
  if (node.type !== "INSTANCE") return false;

  // Check if the component has the custom metadata 'Design System' set to 'True'
  return node.getPluginData("Design System") === "True";
}

// Function to check components and styles in the selected artboard
async function checkComponents() {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    return { error: "No artboard selected. Please select an artboard." };
  }

  const artboard = selection[0];
  if (artboard.type !== "FRAME") {
    return {
      error: "Selected item is not an artboard. Please select an artboard.",
    };
  }

  let totalComponents = 0;
  let designSystemComponents = 0;
  let nonDesignSystemComponentsList = [];

  async function traverseNode(node) {
    if (!node) return;

    if (node.type === "INSTANCE") {
      totalComponents++; // Count every instance
      if (isDesignSystemComponent(node)) {
        designSystemComponents++;
      } else {
        nonDesignSystemComponentsList.push(node.name);
      }
    }

    // Traverse children
    if ("children" in node) {
      for (const child of node.children) {
        await traverseNode(child);
      }
    }
  }

  // Start traversing the artboard
  await traverseNode(artboard);

  const nonDesignSystemComponents = totalComponents - designSystemComponents;
  const percentage =
    totalComponents > 0 ? (designSystemComponents / totalComponents) * 100 : 0;

  return {
    artboardName: artboard.name,
    totalLayers: totalComponents,
    designSystem: designSystemComponents,
    nonDesignSystem: nonDesignSystemComponents,
    percentage: percentage.toFixed(2),
    nonDesignSystemComponentsList: nonDesignSystemComponentsList,
  };
}

// Listen for selection changes
figma.on("selectionchange", async () => {
  const result = await checkComponents();
  figma.ui.postMessage(result);
});
