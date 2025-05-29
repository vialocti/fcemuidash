import { Box, Typography } from '@mui/material';

import React from 'react';
import { keyframes } from '@emotion/react';

// Keyframes personalizados para simular barras que suben y bajan
const bounceHeight = keyframes`
  0%, 100% { height: 30%; }
  50% { height: 100%; }
`;

const CpuLoaderMUI = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={192} // equivalente a h-48
      width="100%"
    >
      {/* Contenedor de barras */}
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        height={128} // equivalente a h-32
        width="100%"
        gap={0.20}
      >
        {[...Array(10)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 18,
              backgroundColor: 'success.main',
              borderRadius: 1,
              animation: `${bounceHeight} 1s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </Box>

      {/* Texto debajo */}
      <Typography
        variant="h6"
        color="success.main"
        sx={{
          mt: 2,
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.2 },
          },
        }}
      >
        Procesando...
      </Typography>
    </Box>
  );
};

export default CpuLoaderMUI;
