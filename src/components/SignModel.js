import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

function SignModel() {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);
  const { scene } = useGLTF("/sign.glb");
  const { viewport } = useThree();

  const clickedScale = (scale, factor) => {
    if (screenWidth > 500) return scale;
    else return scale - factor / screenWidth;
  };

  const screenWidth = viewport.width;
  const screenHeight = viewport.height;

  const moveSpeed = 0.1;
  const initialScale = clickedScale(1.3, 2);
  const initialPos = [
    -screenWidth / 2 + screenWidth * 0.3,
    -screenHeight / 2 + screenHeight * 0.45,
    0,
  ];
  const initialRot = [0, Math.PI / 4, 0];

  // Target values
  const target = clicked
    ? {
        position: [0, -0.1, 0],
        scale: clickedScale(2.78, 3),
        rotation: [0, 0, 0],
      }
    : { position: initialPos, scale: initialScale, rotation: initialRot };

  useFrame(() => {
    if (!ref.current) return;

    // Smoothly interpolate position, rotation, and scale
    ref.current.position.lerp(
      { x: target.position[0], y: target.position[1], z: target.position[2] },
      moveSpeed
    );
    ref.current.scale.lerp(
      { x: target.scale, y: target.scale, z: target.scale },
      moveSpeed
    );
    ref.current.rotation.x +=
      (target.rotation[0] - ref.current.rotation.x) * moveSpeed;
    ref.current.rotation.y +=
      (target.rotation[1] - ref.current.rotation.y) * moveSpeed;
    ref.current.rotation.z +=
      (target.rotation[2] - ref.current.rotation.z) * moveSpeed;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      onClick={() => setClicked(!clicked)}
      scale={initialScale}
      position={initialPos}
      rotation={initialRot}
    >
      <Text
        position={[0, 1.7, 0.11]}
        fontSize={0.35}
        color="black"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
        textAlign="center"
      >
        {" "}
      </Text>
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.04}
        color="black"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
        textAlign="center"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </primitive>
  );
}

export default SignModel;
