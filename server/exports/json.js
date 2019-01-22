// JSON Export
function ExportJSON(formData, submissions) {
    return JSON.stringify({
        name: formData.name,
        description: formData.description, 
        headers: formData.items.map(item => item.label),
        submissions: submissions,
    }, undefined, '\t');
}

// Export Metadata
module.exports = {
    name: 'JSON',
    description: 'JavaScript Object Notation, easy to parse with other programs.',
    icon: 'js',
    
    handler: ExportJSON,
    extension: 'json',
};