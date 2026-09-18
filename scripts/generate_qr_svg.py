import qrcode
import qrcode.image.svg
import xml.etree.ElementTree as ET
import os

def generate():
    qr = qrcode.QRCode(
        version=4,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=3,
    )
    qr.add_data("https://drishti.manasija.in")
    qr.make(fit=True)

    # Generate vector SVG
    factory = qrcode.image.svg.SvgPathImage
    img = qr.make_image(image_factory=factory)
    
    # Save base SVG to string
    svg_bytes = img.to_string()
    svg_str = svg_bytes.decode('utf-8')
    
    # Parse SVG string
    root = ET.fromstring(svg_str)
    
    # Get width and height / viewBox
    viewbox = root.attrib.get('viewBox', '0 0 410 410')
    _, _, width, height = map(float, viewbox.split())
    
    # Center position calculations
    center_size = width * 0.28
    center_x = (width - center_size) / 2
    center_y = (height - center_size) / 2
    
    # Style root SVG
    root.set("style", "background-color: #111213;")
    
    # Update path fill to cyan accent #82dfe9
    for child in root.findall("{http://www.w3.org/2000/svg}path"):
        child.set("fill", "#82dfe9")
        
    # Create center badge container element
    center_g = ET.Element("{http://www.w3.org/2000/svg}g", {
        "id": "qr-center-logo"
    })
    
    # Background badge rectangle
    badge_rect = ET.Element("{http://www.w3.org/2000/svg}rect", {
        "x": str(center_x),
        "y": str(center_y),
        "width": str(center_size),
        "height": str(center_size),
        "rx": "16",
        "fill": "#111213",
        "stroke": "#34383a",
        "stroke-width": "3"
    })
    center_g.append(badge_rect)
    
    # Drishti logo mark SVG paths (scaled and translated into center badge)
    logo_svg_path = "slides/token-efficient-mcp/public/drishti-logo-mark.svg"
    with open(logo_svg_path, "r", encoding="utf-8") as f:
        logo_svg = ET.fromstring(f.read())
        
    # Scale factor for logo (original viewBox 0 0 164 162)
    logo_scale = (center_size * 0.65) / 164.0
    logo_trans_x = center_x + (center_size - 164.0 * logo_scale) / 2
    logo_trans_y = center_y + (center_size - 162.0 * logo_scale) / 2
    
    logo_g = ET.Element("{http://www.w3.org/2000/svg}g", {
        "transform": f"translate({logo_trans_x}, {logo_trans_y}) scale({logo_scale})"
    })
    
    for path in logo_svg.findall("{http://www.w3.org/2000/svg}path"):
        new_path = ET.Element("{http://www.w3.org/2000/svg}path", {
            "d": path.attrib["d"],
            "fill": "#82dfe9"
        })
        logo_g.append(new_path)
        
    center_g.append(logo_g)
    root.append(center_g)
    
    # Write output SVG
    output_path = "slides/token-efficient-mcp/public/drishti-qr.svg"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    tree = ET.ElementTree(root)
    ET.register_namespace("", "http://www.w3.org/2000/svg")
    tree.write(output_path, encoding="utf-8", xml_declaration=True)
    print(f"Successfully generated vector QR code at: {output_path}")

if __name__ == "__main__":
    generate()
