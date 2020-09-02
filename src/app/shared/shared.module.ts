import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, MaterialModule, CommonModule],
    exports: [MaterialModule, ComponentsModule]
})
export class SharedModule {}
