package swing;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import javax.swing.*;

public class TextFileEditor {

	private static JTextArea textArea;
	private static String filePath;
	
	public static void main(String[] args) {
		JFrame frame = new JFrame("Text File Editor");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(400, 300);
		
		textArea = new JTextArea(10, 30);
		JButton saveButton = new JButton("저장");
		JButton loadButton = new JButton("불러오기");
		
		saveButton.addActionListener(e -> {
			String text = textArea.getText();
			if(filePath != null) {
				try(BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
					writer.write(text);
				} catch(IOException ex) {
					ex.printStackTrace();
				}
			}
		});
		
		// 불러오기
		loadButton.addActionListener(e -> {
			JFileChooser fileChooser = new JFileChooser();
			int result = fileChooser.showOpenDialog(null);
			
			if(result == JFileChooser.APPROVE_OPTION) {
				File selectedFile = fileChooser.getSelectedFile();
				filePath = selectedFile.getAbsolutePath();
				
				try (BufferedReader reader = new BufferedReader(new FileReader(filePath))){
					StringBuilder text = new StringBuilder();
					String line;
					while ((line = reader.readLine()) != null) {
						text.append(line).append("\n");
					}
					textArea.setText(text.toString());
				}catch (IOException ex) {
					ex.printStackTrace();
				}
			}
		});
		
		JPanel panel = new JPanel();
		panel.add(saveButton);
		panel.add(loadButton);
		
		frame.add(new JScrollPane(textArea), BorderLayout.CENTER);
		frame.add(panel, BorderLayout.SOUTH);
		
		frame.setVisible(true);
	}
}
