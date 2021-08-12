FROM gitpod/workspace-full:latest

RUN brew update \
    && brew install pre-commit