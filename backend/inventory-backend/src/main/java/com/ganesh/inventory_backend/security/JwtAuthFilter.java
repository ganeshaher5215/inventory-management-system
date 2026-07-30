package com.ganesh.inventory_backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                     @NonNull HttpServletResponse response,
                                     @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
   final String username = jwtUtil.extractUsername(jwt);

   System.out.println("=== JWT DEBUG ===");
   System.out.println("Extracted username: " + username);

   if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);

      System.out.println("UserDetails username: " + userDetails.getUsername());
      System.out.println("Token valid? " + jwtUtil.isTokenValid(jwt, userDetails));

      if (jwtUtil.isTokenValid(jwt, userDetails)) {
         UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                  userDetails, null, userDetails.getAuthorities());
         authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
         SecurityContextHolder.getContext().setAuthentication(authToken);
         System.out.println("Authentication SET successfully");
      } else {
         System.out.println("Token validation FAILED");
      }
   }

        filterChain.doFilter(request, response);
    }
}
